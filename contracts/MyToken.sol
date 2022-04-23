pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialnumberoftokens)
        public
        ERC20("Dummy  Token", "DUMM")
    {
        _mint(msg.sender, initialnumberoftokens);
    }
}
