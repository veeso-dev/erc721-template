# IPFS upload

IPFS upload is simple tool to upload the NFT metadata JSON and the related image to IPFS using [nft.storage](https://nft.storage).

## Get started

### Setup environment

```sh
echo "APIKEY=$NFT_STORAGE_APIKEY" >> .env
```

### Setup artifacts directory

You need to setup a directory on your file system containing for each NFT two file:

- `xxxx-{any}.json`: JSON file containing the metadata for the NFT. The `image` key will be overwritten by the tool once the image is uploaded
- `xxxx-{any}.png`: PNG file containing the NFT image

where `xxxx` is an incrementing number of the NFT (e.g. `0001`).

### Upload NFTs

In order to upload NFTs, run in this directory:

```sh
./upload.sh $ARTIFACTS_DIR $OUTPUT_DIR $ID_OF_NFT_TO_START_FROM $ID_OF_THE_LAST_NFT
```

where output_dir is a directory where the metadata will be written to a file called like the JSON file containing this data:

```json
{
  "image": "bafkreif6kstff6tnsblvcujgfgvd6y6zycmnl5xcrwynpmcgnbmdv5s2mq",
  "imageUrl": "ipfs://bafkreif6kstff6tnsblvcujgfgvd6y6zycmnl5xcrwynpmcgnbmdv5s2mq",
  "metadata": "bafkreie3a65aggeoxw4ozxxe7tmmn2j2m7sazzdrj63h4m4hgmnwpc6l2i",
  "metadataUrl": "ipfs://bafkreie3a65aggeoxw4ozxxe7tmmn2j2m7sazzdrj63h4m4hgmnwpc6l2i"
}
```

At this point you should be able to create an NFT passing `metadataUrl` as the `tokenURI`.
