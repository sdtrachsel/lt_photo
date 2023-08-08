import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "../Header";

const MockHeader = () => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )
};

describe("Header Component", () => {
 
  beforeEach(() => {
    render(MockHeader());
  })

  it("should display the logo", () => {
    const imgElement = screen.getByAltText('logo');
    expect(imgElement).toBeInTheDocument();
  });

  it("should navigate to landing page when logo is clicked", () => {
    const imgElement = screen.getByAltText('logo');
    const linkElement = imgElement.closest('a');
    expect(linkElement).toHaveAttribute('href', '/');
  });
});