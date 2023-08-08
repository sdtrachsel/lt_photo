import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, useParams } from "react-router-dom";
import { AlbumCard } from "../AlbumCard";

const MockAlbumCard = ({ albumId, title }) => {
  return (
    <BrowserRouter>
      <AlbumCard albumId={albumId} title={title} />
    </BrowserRouter>
  )
}

describe("AlbumCard", () => {
  const mockAlbumId = 4;
  const mockAlbumTitle = "Test Album";
  beforeEach(() => {
    render(<MockAlbumCard albumId={mockAlbumId} title={mockAlbumTitle} />);
  });

  it("should render an album's title", () => {
    const titleElement = screen.getByText(mockAlbumTitle);
    expect(titleElement).toBeVisible();
  });

  it("should render an album's id", () => {
    const idElement = screen.getByText(mockAlbumId);
    expect(idElement).toBeVisible();
  });

  it("should be a link to the album page", () => {
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/album/${mockAlbumId}`);
  });
});