const { expect } = require("chai");
const { ethers } = require("hardhat");

let accounts;
let portfolio;

beforeEach(async () => {
  accounts = await ethers.getSigners();
  const PortfolioContractFactory = await hre.ethers.getContractFactory(
    "Portfolio"
  );
  portfolio = await PortfolioContractFactory.deploy();
  await portfolio.deployed();
});

describe("Portfolio", function () {
  // it("Should return the new greeting once it's changed", async function () {
  //   const Greeter = await ethers.getContractFactory("Greeter");
  //   const greeter = await Greeter.deploy("Hello, world!");
  //   await greeter.deployed();

  //   expect(await greeter.greet()).to.equal("Hello, world!");

  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();

  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });

  it("Should add a new Project", async () => {
    const createProject1Txn = await portfolio.addNewProject(
      "My Personal Blog",
      "A basic web-based blog",
      [0, 1, 2],
      ["RUBY"],
      "https://github.com/Sambit99/Portfolio-Design-in-Solidity"
    );
    await createProject1Txn.wait();

    const myProjects = await portfolio.getMyProjects();

    expect(myProjects.length).to.equal(1);
  });

  it("Should get all the Projects", async () => {
    const myProjects = await portfolio.getMyProjects();
    expect(myProjects.length).to.equal(0);
  });

  it("Should return owner address", async () => {
    const owner = await portfolio.owner();
    expect(owner).to.equal(accounts[0].address);
  });
});
