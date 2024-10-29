import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import App from "./App";

// Mock fetchProducts to return mock data
jest.mock("./db/mockApi", () => ({
  fetchProducts: jest.fn().mockResolvedValue({
    data: [
      { id: 1, name: "Nike Air Monarch IV", price: 200, company: "Nike", category: "sneakers", rating: 5, imageUrl: "" },
      { id: 2, name: "Adidas Ultra Boost", price: 150, company: "Adidas", category: "sneakers", rating: 4, imageUrl: "" },
      { id: 3, name: "Puma Running Shoes", price: 100, company: "Puma", category: "running", rating: 3, imageUrl: "" },
    ],
  }),
}));

describe("App Component", () => {
  it("renders loading state initially", () => {
    render(<App />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders products after loading", async () => {
    render(<App />);

    // Wait for products to be rendered
    await waitFor(() => {
      expect(screen.getByText(/nike air monarch iv/i)).toBeInTheDocument();
      expect(screen.getByText(/adidas ultra boost/i)).toBeInTheDocument();
    });
  });

  it("filters products by category", async () => {
    render(<App />);

    // Wait for products to be rendered
    await waitFor(() => screen.getByText(/nike air monarch iv/i));

    // Simulate category filter change to 'sneakers'
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "sneakers" },
    });

    // Check if the filtered products are displayed
    expect(screen.getByText(/nike air monarch iv/i)).toBeInTheDocument();
    expect(screen.getByText(/adidas ultra boost/i)).toBeInTheDocument();
    expect(screen.queryByText(/puma running shoes/i)).not.toBeInTheDocument();
  });

  it("filters products by brand", async () => {
    render(<App />);

    // Wait for products to be rendered
    await waitFor(() => screen.getByText(/nike air monarch iv/i));

    // Simulate brand filter change to 'Nike'
    fireEvent.change(screen.getByLabelText(/brand/i), {
      target: { value: "Nike" },
    });

    // Check if the filtered products are displayed
    expect(screen.getByText(/nike air monarch iv/i)).toBeInTheDocument();
    expect(screen.queryByText(/adidas ultra boost/i)).not.toBeInTheDocument();
  });

  it("shows no products found when no matches", async () => {
    render(<App />);

    // Wait for products to be rendered
    await waitFor(() => screen.getByText(/nike air monarch iv/i));

    // Simulate brand filter change to 'Reebok' (no match)
    fireEvent.change(screen.getByLabelText(/brand/i), {
      target: { value: "Reebok" },
    });

    // Check if no products are displayed
    expect(screen.queryByText(/nike air monarch iv/i)).not.toBeInTheDocument();
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });
});
