import React from "react";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { BrowserRouter, useParams } from "react-router-dom";
import { Photo } from "../Photo";
import { getPhoto } from "../../../apiCalls";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../../../apiCalls", () => ({
  getPhoto: jest.fn(),
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

const MockPhoto = () => {
  return (
    <BrowserRouter>
      <Photo />
    </BrowserRouter>
  )
}

describe("Photo Component", () => {
  const mockPhotoId = "1";
  const mockPhoto = {
    title: "samplePhoto",
    url: "http://example.com/photo1.jpg",
  };

  beforeEach(() => {
    useParams.mockReturnValue({ photoId: mockPhotoId });
});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it ("should show loader when loading", async () => {
    getPhoto.mockResolvedValueOnce([]);
    render(MockPhoto());

    await act(async () => {
        await waitFor(() => expect(screen.getByText("Loading")).toBeInTheDocument());
    });
  })

  it("should show error when fetch fails", async () => {
    const mockErrorMsg = "Error fetching photo";
    getPhoto.mockRejectedValueOnce({ message: mockErrorMsg });

    await act(async () => {
      render(MockPhoto());
    });

    await waitFor(() => expect(screen.getByText("Error")).toBeInTheDocument());
  });

  it("should display photo details when fetch succeeds", async () => {
    getPhoto.mockResolvedValueOnce(mockPhoto);
    
    await act(async () => {
      render(MockPhoto());
    });

    await waitFor(() => {
      expect(screen.getByText(mockPhoto.title)).toBeInTheDocument();
      expect(screen.getByAltText(mockPhoto.title)).toHaveAttribute("src", mockPhoto.url);
    });
  });
});