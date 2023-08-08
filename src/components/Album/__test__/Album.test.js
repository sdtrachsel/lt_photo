import React from "react";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { BrowserRouter, useParams } from "react-router-dom";
import { Album } from "../Album";
import { getAlbum } from "../../../apiCalls";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../../../apiCalls", () => ({
  getAlbum: jest.fn(),
}));

jest.mock("../../Loader/Loader", () => ({
  Loader: () => {
    return <div>Loading</div>
  }
}));

jest.mock("../../Error/Error", () => ({
  Error: () => {
    return <div>Error</div>
  }
}));

const MockAlbum = () => {
  return (
    <BrowserRouter>
      <Album />
    </BrowserRouter>
  )
};

describe("Album component", () => {
  const mockAlbumId = "1";
  const mockPhotos = [
    {
      id: 1,
      title: "photoOne",
      thumbnailUrl: "http://example.com/photo1.jpg",
      url: "http://example.com/photo1.jpg",
    },
    {
      id: 2,
      title: "photoTwo",
      thumbnailUrl: "http://example.com/photo2.jpg",
      url: "http://example.com/photo2.jpg",
    },
  ];

  beforeEach(() => {
    useParams.mockReturnValue({ albumId: mockAlbumId });
  });

  it("should show loader when loading", async () => {
    getAlbum.mockResolvedValueOnce([]);
    render(MockAlbum());

    await act(async () => {
      await waitFor(() => expect(screen.getByText("Loading")).toBeInTheDocument());
    });
  });

  it("should show error when fetch fails", async () => {
    const mockErrorMsg = "Error fetching album";
    getAlbum.mockRejectedValueOnce({ message: mockErrorMsg });

    await act(async () => {
      render(MockAlbum());
    });

    await waitFor(() => expect(screen.getByText("Error")).toBeInTheDocument());
  });

  it("should show PhotoCard components when fetch succeeds", async () => {

    getAlbum.mockResolvedValueOnce(mockPhotos);

    await act(async () => {
      render(MockAlbum());
    });

    await waitFor(() => {
      expect(screen.getByText("photoOne")).toBeInTheDocument();
      expect(screen.getByText("photoTwo")).toBeInTheDocument();
    });
  });

  it("should search photo cards by title", async () => {
    getAlbum.mockResolvedValueOnce(mockPhotos);

    await act(async () => {
      render(MockAlbum());
    });

    await screen.findByText(/photoOne/i);

    fireEvent.change(screen.getByPlaceholderText(/Search by Photo Title or ID/i), {
      target: { value: "photoOne" }
    });

    expect(screen.getByText("photoOne")).toBeInTheDocument();
    expect(screen.queryByText("photoTwo")).toBeNull();
  })

  it("should search photo cards by id", async () => {
    getAlbum.mockResolvedValueOnce(mockPhotos);

    await act(async () => {
      render(MockAlbum());
    });

    await screen.findByText(/photoOne/i);

    fireEvent.change(screen.getByPlaceholderText(/Search by Photo Title or ID/i), {
      target: { value: "1" }
    });

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeNull();
  })
})