pragma solidity ^0.6.0;

import "./Crowdsale.sol";
import "./Kyc_Contract.sol";

contract MyTokenSale is Crowdsale {
    KycContract kyc;

    constructor(
        uint256 rate,
        address payable mywallet,
        IERC20 token,
        KycContract _kyc
    ) public Crowdsale(rate, mywallet, token) {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 Amountinwei)
        internal
        view
        override
    {
        super._preValidatePurchase(beneficiary, Amountinwei);
        require(
            kyc.kycCompleted(msg.sender),
            "KYC Not completed, purchase not allowed"
        );
    }
}
