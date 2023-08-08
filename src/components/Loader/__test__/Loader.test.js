import React from "react";
import { render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "../Loader";

const MockLoader = () => {
  return (
    <BrowserRouter>
      <Loader />
    </BrowserRouter>
  )
};

describe("Loader Component", () => {
 
  beforeEach(() => {
    render(MockLoader());
  });

  it("should display loader", () => {
    const loaderElement = screen.getByText(/Loading .../i );
    expect(loaderElement).toBeInTheDocument();
  });

});