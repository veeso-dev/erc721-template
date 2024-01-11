import { expect } from "chai";
import { ethers } from "hardhat";
import { MyNft } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("MyNft", () => {
  interface Contract {
    token: MyNft;
    owner: SignerWithAddress;
    otherAccount: SignerWithAddress;
  }

  let deploy: Contract;
  let _name = "MyNft";
  let _symbol = "NFT";

  beforeEach(async () => {
    const [owner, otherAccount] = await ethers.getSigners();
    const contract = await ethers.deployContract(_name, [owner.address]);

    deploy = {
      token: contract as unknown as MyNft,
      owner,
      otherAccount,
    };
  });

  it("Should has the correct name and symbol ", async () => {
    const { token } = deploy;
    expect(await token.name()).to.equal(_name);
    expect(await token.symbol()).to.equal(_symbol);
  });

  it("Should mint a token with token ID 1 & 2 to account1", async () => {
    const { otherAccount, token } = deploy;
    await token.safeMint(
      otherAccount.address,
      "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1"
    );
    expect(await token.ownerOf(1)).to.equal(otherAccount.address);
    expect(await token.tokenURI(1)).to.equal(
      "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1"
    );

    await token.safeMint(
      otherAccount.address,
      "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2"
    );
    expect(await token.ownerOf(2)).to.equal(otherAccount.address);
    expect(await token.tokenURI(2)).to.equal(
      "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2"
    );

    expect(await token.balanceOf(otherAccount.address)).to.equal(2);
  });

  it("should not allow mint from non owner", async () => {
    const { otherAccount, token } = deploy;
    await expect(
      token
        .connect(otherAccount.address)
        .safeMint(
          otherAccount.address,
          "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1"
        )
    ).to.be.rejectedWith(Error);
  });

  it("should transfer ownership of the NFT", async () => {
    const { otherAccount, owner: originalOwner, token } = deploy;
    await token.transferOwnership(otherAccount.address);
    expect(await token.owner()).to.equal(otherAccount.address);
  });
});
