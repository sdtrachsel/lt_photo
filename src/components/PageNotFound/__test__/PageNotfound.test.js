import React from "react";
import { render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PageNotFound } from "../PageNotFound";

const MockPageNotFound = () => {
  return (
    <BrowserRouter>
      <PageNotFound />
    </BrowserRouter>
  )
};

describe("PageNotFound Component", () => {
 
  beforeEach(() => {
    render(MockPageNotFound());
  });

  it("should display page not found text", () => {
    const errorHeaderElement = screen.getByText(/404: Page Not Found/i );
    const errorTextElement = screen.getByText(/The page you are looking for doesn't exist or an other error occured./i );
    expect(errorHeaderElement).toBeVisible();
    expect(errorTextElement).toBeVisible();
  });

});