import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import App from "../App";
import { fetchProducts } from "../db/mockApi";

// Mock the fetchProducts function
jest.mock("../db/mockApi", () => ({
  fetchProducts: jest.fn(),
}));

const mockProducts = [
  {
    id: 1,
    name: "Nike Air Monarch IV",
    price: 200,
    company: "Nike",
    category: "sneakers",
    rating: 5,
    imageUrl: "https://example.com/nike-air-monarch.jpg",
  },
  {
    id: 2,
    name: "Adidas Ultra Boost",
    price: 150,
    company: "Adidas",
    category: "sneakers",
    rating: 4,
    imageUrl: "https://example.com/adidas-ultra-boost.jpg",
  },
];

// Mock fetchProducts to return mockProducts
beforeEach(() => {
  fetchProducts.mockResolvedValue({ data: mockProducts });
});

describe("App Component", () => {
  it("renders components correctly", async () => {
    render(<App />);

    // Check if Sidebar, Navigation, Brand, and Products components render
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findByText(/nike air monarch iv/i)).toBeInTheDocument();
    expect(await screen.findByText(/adidas ultra boost/i)).toBeInTheDocument();
  });

  it("filters products by category", async () => {
    render(<App />);

    // Wait for products to be rendered
    await screen.findByText(/nike air monarch iv/i);

    // Simulate category filter change to 'sneakers'
    const categoryFilter = screen.getByLabelText(/category/i);
    fireEvent.change(categoryFilter, { target: { value: "sneakers" } });

    // Check if filtered products are displayed
    expect(screen.getByText(/nike air monarch iv/i)).toBeInTheDocument();
    expect(screen.getByText(/adidas ultra boost/i)).toBeInTheDocument();
  });

  it("filters products by price range", async () => {
    render(<App />);

    // Wait for products to be rendered
    await screen.findByText(/nike air monarch iv/i);

    // Simulate price filter change to $0-$150
    const priceFilter = screen.getByLabelText(/price/i);
    fireEvent.change(priceFilter, { target: { value: "150" } });

    // Check if filtered products are displayed
    expect(screen.queryByText(/nike air monarch iv/i)).not.toBeInTheDocument();
    expect(screen.getByText(/adidas ultra boost/i)).toBeInTheDocument();
  });

  it("filters products by brand", async () => {
    render(<App />);

    // Wait for products to be rendered
    await screen.findByText(/nike air monarch iv/i);

    // Simulate brand filter change to 'Nike'
    const brandFilter = screen.getByLabelText(/brand/i);
    fireEvent.change(brandFilter, { target: { value: "Nike" } });

    // Check if filtered products are displayed
    expect(screen.getByText(/nike air monarch iv/i)).toBeInTheDocument();
    expect(screen.queryByText(/adidas ultra boost/i)).not.toBeInTheDocument();
  });

  it("updates filter results in real-time", async () => {
    render(<App />);

    // Wait for products to be rendered
    await screen.findByText(/nike air monarch iv/i);

    // Simulate search input change
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "nike" } });

    // Check if only matching product is displayed
    expect(screen.getByText(/nike air monarch iv/i)).toBeInTheDocument();
    expect(screen.queryByText(/adidas ultra boost/i)).not.toBeInTheDocument();
  });

  it("displays 'no products found' when no products match the criteria", async () => {
    render(<App />);

    // Wait for products to be rendered
    await screen.findByText(/nike air monarch iv/i);

    // Simulate brand filter change to 'Puma'
    const brandFilter = screen.getByLabelText(/brand/i);
    fireEvent.change(brandFilter, { target: { value: "Puma" } });

    // Check if 'no products found' message is displayed
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it("sorts products correctly by price ascending", async () => {
    render(<App />);

    // Wait for products to be rendered
    await screen.findByText(/nike air monarch iv/i);

    // Simulate sort change to 'priceAsc'
    const sortSelect = screen.getByLabelText(/sort/i);
    fireEvent.change(sortSelect, { target: { value: "priceAsc" } });

    // Check if products are sorted by price ascending
    const sortedProducts = screen.getAllByTestId("product-price");
    expect(sortedProducts[0]).toHaveTextContent("$150");
    expect(sortedProducts[1]).toHaveTextContent("$200");
  });
});
