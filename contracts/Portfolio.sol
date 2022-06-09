// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Portfolio{

    enum technologies{
        REACT,
        NODEJS,
        JAVASCRIPT,
        PYTHON,
        FLASK,
        MONGODB,
        MYSQL,
        MARIADB,
        RUBY
    }


    struct projectFormat{
        string name;
        string description;
        technologies[] technologyStack;
        string[] otherTechnologyStack;
        string url;
    }

    event newProjectCreation(
        address manager,
        string projectName
    );

    address public owner;
    string[] public socialNetworks;
    projectFormat[] private projects;

    constructor(){
        owner = msg.sender;
    }

    function getMyProjects() view public returns(projectFormat[] memory){
        return projects;
    }

    function addNewProject(string memory _name, string memory _description, technologies[] memory _technology,string[] memory _otherTechnologyStack,  string memory _url) external {
        projectFormat memory newProject = projectFormat({
            name: _name,
            description: _description,
            technologyStack: _technology,
            otherTechnologyStack: _otherTechnologyStack,
            url: _url
        });
        projects.push(newProject);
        emit newProjectCreation(msg.sender,_name);
    }
}