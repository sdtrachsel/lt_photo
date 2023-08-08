import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PhotoCard } from "../PhotoCard";

const MockPhotoCard = ({ photoId, title, thumbnail }) => {
  return (
    <BrowserRouter>
      <PhotoCard photoId={photoId} title={title} thumbnail={thumbnail} />
    </BrowserRouter>
  )
}

describe("PhotoCard", () => {
  const mockPhotoId = 123;
  const mockTitle= "Test Title";
  const mockThumbnail= "http://example.com/thumbnail.jpg";

  beforeEach(() => {
    render(<MockPhotoCard photoId={mockPhotoId} title={mockTitle} thumbnail={mockThumbnail} />);
  });

  it("should render a photo's title", () => {
    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeVisible();
  });

  it("should render a photo's id", () => {
    const idElement = screen.getByText(mockPhotoId);
    expect(idElement).toBeVisible();
  });

  it("should be a link to the photo page", () => {
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/photo/${mockPhotoId}`);
  });
});