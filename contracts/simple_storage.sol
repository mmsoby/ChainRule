pragma solidity ^0.6.0;


contract SimpleStorage {

  int public operandOne;
  int public operandTwo;
  int public result;
  string public operation;

  event Set(address caller, uint _value);

  constructor(int initialValue) public {
    operandOne = initialValue;
    operandTwo = initialValue;
    operation = "";
  }

  function setOperandOne(int x) public {
    operandOne =x;
  }

  function setOperandTwo(int x) public {
    operandTwo = x;
  }

  function setOperation(string memory x) public {
    operation = x;
  }

  function calculate() public returns (int256) {
    if (keccak256(bytes(operation)) == keccak256(bytes("add"))) {
      result = operandOne + operandTwo;
    } else if (keccak256(bytes(operation)) == keccak256(bytes("sub"))) {
      result = operandOne-operandTwo;
    } else if (keccak256(bytes(operation)) == keccak256(bytes("mul"))) {
      result = operandOne*operandTwo;
    } else if (keccak256(bytes(operation)) == keccak256(bytes("div"))) {
      result = operandOne/operandTwo;
    } else {
      result = 0;
    }
    return result;
  }


}
