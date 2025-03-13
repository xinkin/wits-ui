import { GenesisStoneMetadata } from "@/types";

export async function fetchMetadataFromUrl(
  url: string,
): Promise<GenesisStoneMetadata> {
  try {
    // Handle IPFS URLs if needed
    const fetchUrl = url.startsWith("ipfs://")
      ? url.replace("ipfs://", "https://ipfs.io/ipfs/")
      : url;

    const response = await fetch(
      `/api/proxy?url=${encodeURIComponent(fetchUrl)}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch metadata: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data as GenesisStoneMetadata;
  } catch (error) {
    console.error(`Error fetching metadata from ${url}:`, error);
    throw error;
  }
}
