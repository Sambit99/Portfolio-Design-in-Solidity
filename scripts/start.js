const main = async () => {
  const PortfolioContractFactory = await hre.ethers.getContractFactory(
    "Portfolio"
  );
  const PortfolioContract = await PortfolioContractFactory.deploy();
  await PortfolioContract.deployed();
  console.log(`Portfolio Contract deployed to : ${PortfolioContract.address}`);

  const createProject1Txn = await PortfolioContract.addNewProject(
    "My Personal Blog",
    "A basic web-based blog",
    [0, 1, 2],
    ["RUBY"],
    "https://github.com/Sambit99/Portfolio-Design-in-Solidity"
  );
  const res = await createProject1Txn.wait();
  console.log(res.events);

  const myProjects = await PortfolioContract.getMyProjects();
  console.log(myProjects);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
