// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package sale

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// SaleListing is an auto generated low-level Go binding around an user-defined struct.
type SaleListing struct {
	Seller  common.Address
	TokenId *big.Int
	Price   *big.Int
	Amount  *big.Int
}

// SaleMetaData contains all meta data concerning the Sale contract.
var SaleMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"contractIERC1155\",\"name\":\"_tokenContract\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"listingId\",\"type\":\"uint256\"}],\"name\":\"buyToken\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getListings\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"seller\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"price\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structSale.Listing[]\",\"name\":\"\",\"type\":\"tuple[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"price\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"listToken\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"listings\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"seller\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"price\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"tokenContract\",\"outputs\":[{\"internalType\":\"contractIERC1155\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
	Bin: "0x60806040523480156200001157600080fd5b50604051620010b5380380620010b58339818101604052810190620000379190620000fc565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200012e565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620000b08262000083565b9050919050565b6000620000c482620000a3565b9050919050565b620000d681620000b7565b8114620000e257600080fd5b50565b600081519050620000f681620000cb565b92915050565b6000602082840312156200011557620001146200007e565b5b60006200012584828501620000e5565b91505092915050565b610f77806200013e6000396000f3fe60806040526004361061004a5760003560e01c80632d296bf11461004f57806355a373d61461006b578063bce64a7d14610096578063de74e57b146100bf578063f1b2d6a3146100ff575b600080fd5b6100696004803603810190610064919061083d565b61012a565b005b34801561007757600080fd5b506100806105dd565b60405161008d91906108e9565b60405180910390f35b3480156100a257600080fd5b506100bd60048036038101906100b89190610904565b610601565b005b3480156100cb57600080fd5b506100e660048036038101906100e1919061083d565b6106cf565b6040516100f69493929190610987565b60405180910390f35b34801561010b57600080fd5b5061011461072f565b6040516101219190610aee565b60405180910390f35b6001805490508110610171576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161016890610b6d565b60405180910390fd5b60006001828154811061018757610186610b8d565b5b90600052602060002090600402016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820154815250509050806040015134101561025d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161025490610c2e565b60405180910390fd5b806060015160008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1662fdd58e836000015184602001516040518363ffffffff1660e01b81526004016102c4929190610c4e565b602060405180830381865afa1580156102e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103059190610c8c565b1015610346576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161033d90610d2b565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f242432a826000015133846020015185606001516040518563ffffffff1660e01b81526004016103b19493929190610d82565b600060405180830381600087803b1580156103cb57600080fd5b505af11580156103df573d6000803e3d6000fd5b505050506000816000015173ffffffffffffffffffffffffffffffffffffffff163460405161040d90610e08565b60006040518083038185875af1925050503d806000811461044a576040519150601f19603f3d011682016040523d82523d6000602084013e61044f565b606091505b5050905080610493576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161048a90610e8f565b60405180910390fd5b60018080805490506104a59190610ede565b815481106104b6576104b5610b8d565b5b9060005260206000209060040201600184815481106104d8576104d7610b8d565b5b90600052602060002090600402016000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018201548160010155600282015481600201556003820154816003015590505060018054806105805761057f610f12565b5b6001900381819060005260206000209060040201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160009055600382016000905550509055505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160405180608001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200185815260200184815260200183815250908060018154018082558091505060019003906000526020600020906004020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020155606082015181600301555050505050565b600181815481106106df57600080fd5b90600052602060002090600402016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154905084565b60606001805480602002602001604051908101604052809291908181526020016000905b828210156107f957838290600052602060002090600402016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820154815260200160038201548152505081526020019060010190610753565b50505050905090565b600080fd5b6000819050919050565b61081a81610807565b811461082557600080fd5b50565b60008135905061083781610811565b92915050565b60006020828403121561085357610852610802565b5b600061086184828501610828565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006108af6108aa6108a58461086a565b61088a565b61086a565b9050919050565b60006108c182610894565b9050919050565b60006108d3826108b6565b9050919050565b6108e3816108c8565b82525050565b60006020820190506108fe60008301846108da565b92915050565b60008060006060848603121561091d5761091c610802565b5b600061092b86828701610828565b935050602061093c86828701610828565b925050604061094d86828701610828565b9150509250925092565b60006109628261086a565b9050919050565b61097281610957565b82525050565b61098181610807565b82525050565b600060808201905061099c6000830187610969565b6109a96020830186610978565b6109b66040830185610978565b6109c36060830184610978565b95945050505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610a0181610957565b82525050565b610a1081610807565b82525050565b608082016000820151610a2c60008501826109f8565b506020820151610a3f6020850182610a07565b506040820151610a526040850182610a07565b506060820151610a656060850182610a07565b50505050565b6000610a778383610a16565b60808301905092915050565b6000602082019050919050565b6000610a9b826109cc565b610aa581856109d7565b9350610ab0836109e8565b8060005b83811015610ae1578151610ac88882610a6b565b9750610ad383610a83565b925050600181019050610ab4565b5085935050505092915050565b60006020820190508181036000830152610b088184610a90565b905092915050565b600082825260208201905092915050565b7f496e76616c6964206c697374696e672049440000000000000000000000000000600082015250565b6000610b57601283610b10565b9150610b6282610b21565b602082019050919050565b60006020820190508181036000830152610b8681610b4a565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f53656e742076616c7565206973206c657373207468616e20746865206c69737460008201527f696e672070726963650000000000000000000000000000000000000000000000602082015250565b6000610c18602983610b10565b9150610c2382610bbc565b604082019050919050565b60006020820190508181036000830152610c4781610c0b565b9050919050565b6000604082019050610c636000830185610969565b610c706020830184610978565b9392505050565b600081519050610c8681610811565b92915050565b600060208284031215610ca257610ca1610802565b5b6000610cb084828501610c77565b91505092915050565b7f53656c6c657220646f6573206e6f74206861766520656e6f75676820746f6b6560008201527f6e7320666f722073616c65000000000000000000000000000000000000000000602082015250565b6000610d15602b83610b10565b9150610d2082610cb9565b604082019050919050565b60006020820190508181036000830152610d4481610d08565b9050919050565b600082825260208201905092915050565b50565b6000610d6c600083610d4b565b9150610d7782610d5c565b600082019050919050565b600060a082019050610d976000830187610969565b610da46020830186610969565b610db16040830185610978565b610dbe6060830184610978565b8181036080830152610dcf81610d5f565b905095945050505050565b600081905092915050565b6000610df2600083610dda565b9150610dfd82610d5c565b600082019050919050565b6000610e1382610de5565b9150819050919050565b7f4661696c656420746f207472616e7366657220457468657220746f207468652060008201527f73656c6c65720000000000000000000000000000000000000000000000000000602082015250565b6000610e79602683610b10565b9150610e8482610e1d565b604082019050919050565b60006020820190508181036000830152610ea881610e6c565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610ee982610807565b9150610ef483610807565b9250828203905081811115610f0c57610f0b610eaf565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea2646970667358221220be7d31e9d3fca0f4da95264daa6f7880a296bdc0582a945f62135f0d5c27844164736f6c63430008120033",
}

// SaleABI is the input ABI used to generate the binding from.
// Deprecated: Use SaleMetaData.ABI instead.
var SaleABI = SaleMetaData.ABI

// SaleBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use SaleMetaData.Bin instead.
var SaleBin = SaleMetaData.Bin

// DeploySale deploys a new Ethereum contract, binding an instance of Sale to it.
func DeploySale(auth *bind.TransactOpts, backend bind.ContractBackend, _tokenContract common.Address) (common.Address, *types.Transaction, *Sale, error) {
	parsed, err := SaleMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(SaleBin), backend, _tokenContract)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Sale{SaleCaller: SaleCaller{contract: contract}, SaleTransactor: SaleTransactor{contract: contract}, SaleFilterer: SaleFilterer{contract: contract}}, nil
}

// Sale is an auto generated Go binding around an Ethereum contract.
type Sale struct {
	SaleCaller     // Read-only binding to the contract
	SaleTransactor // Write-only binding to the contract
	SaleFilterer   // Log filterer for contract events
}

// SaleCaller is an auto generated read-only Go binding around an Ethereum contract.
type SaleCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SaleTransactor is an auto generated write-only Go binding around an Ethereum contract.
type SaleTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SaleFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SaleFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SaleSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SaleSession struct {
	Contract     *Sale             // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SaleCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SaleCallerSession struct {
	Contract *SaleCaller   // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// SaleTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SaleTransactorSession struct {
	Contract     *SaleTransactor   // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SaleRaw is an auto generated low-level Go binding around an Ethereum contract.
type SaleRaw struct {
	Contract *Sale // Generic contract binding to access the raw methods on
}

// SaleCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SaleCallerRaw struct {
	Contract *SaleCaller // Generic read-only contract binding to access the raw methods on
}

// SaleTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SaleTransactorRaw struct {
	Contract *SaleTransactor // Generic write-only contract binding to access the raw methods on
}

// NewSale creates a new instance of Sale, bound to a specific deployed contract.
func NewSale(address common.Address, backend bind.ContractBackend) (*Sale, error) {
	contract, err := bindSale(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Sale{SaleCaller: SaleCaller{contract: contract}, SaleTransactor: SaleTransactor{contract: contract}, SaleFilterer: SaleFilterer{contract: contract}}, nil
}

// NewSaleCaller creates a new read-only instance of Sale, bound to a specific deployed contract.
func NewSaleCaller(address common.Address, caller bind.ContractCaller) (*SaleCaller, error) {
	contract, err := bindSale(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SaleCaller{contract: contract}, nil
}

// NewSaleTransactor creates a new write-only instance of Sale, bound to a specific deployed contract.
func NewSaleTransactor(address common.Address, transactor bind.ContractTransactor) (*SaleTransactor, error) {
	contract, err := bindSale(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SaleTransactor{contract: contract}, nil
}

// NewSaleFilterer creates a new log filterer instance of Sale, bound to a specific deployed contract.
func NewSaleFilterer(address common.Address, filterer bind.ContractFilterer) (*SaleFilterer, error) {
	contract, err := bindSale(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SaleFilterer{contract: contract}, nil
}

// bindSale binds a generic wrapper to an already deployed contract.
func bindSale(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := SaleMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Sale *SaleRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Sale.Contract.SaleCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Sale *SaleRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Sale.Contract.SaleTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Sale *SaleRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Sale.Contract.SaleTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Sale *SaleCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Sale.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Sale *SaleTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Sale.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Sale *SaleTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Sale.Contract.contract.Transact(opts, method, params...)
}

// GetListings is a free data retrieval call binding the contract method 0xf1b2d6a3.
//
// Solidity: function getListings() view returns((address,uint256,uint256,uint256)[])
func (_Sale *SaleCaller) GetListings(opts *bind.CallOpts) ([]SaleListing, error) {
	var out []interface{}
	err := _Sale.contract.Call(opts, &out, "getListings")

	if err != nil {
		return *new([]SaleListing), err
	}

	out0 := *abi.ConvertType(out[0], new([]SaleListing)).(*[]SaleListing)

	return out0, err

}

// GetListings is a free data retrieval call binding the contract method 0xf1b2d6a3.
//
// Solidity: function getListings() view returns((address,uint256,uint256,uint256)[])
func (_Sale *SaleSession) GetListings() ([]SaleListing, error) {
	return _Sale.Contract.GetListings(&_Sale.CallOpts)
}

// GetListings is a free data retrieval call binding the contract method 0xf1b2d6a3.
//
// Solidity: function getListings() view returns((address,uint256,uint256,uint256)[])
func (_Sale *SaleCallerSession) GetListings() ([]SaleListing, error) {
	return _Sale.Contract.GetListings(&_Sale.CallOpts)
}

// Listings is a free data retrieval call binding the contract method 0xde74e57b.
//
// Solidity: function listings(uint256 ) view returns(address seller, uint256 tokenId, uint256 price, uint256 amount)
func (_Sale *SaleCaller) Listings(opts *bind.CallOpts, arg0 *big.Int) (struct {
	Seller  common.Address
	TokenId *big.Int
	Price   *big.Int
	Amount  *big.Int
}, error) {
	var out []interface{}
	err := _Sale.contract.Call(opts, &out, "listings", arg0)

	outstruct := new(struct {
		Seller  common.Address
		TokenId *big.Int
		Price   *big.Int
		Amount  *big.Int
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Seller = *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	outstruct.TokenId = *abi.ConvertType(out[1], new(*big.Int)).(**big.Int)
	outstruct.Price = *abi.ConvertType(out[2], new(*big.Int)).(**big.Int)
	outstruct.Amount = *abi.ConvertType(out[3], new(*big.Int)).(**big.Int)

	return *outstruct, err

}

// Listings is a free data retrieval call binding the contract method 0xde74e57b.
//
// Solidity: function listings(uint256 ) view returns(address seller, uint256 tokenId, uint256 price, uint256 amount)
func (_Sale *SaleSession) Listings(arg0 *big.Int) (struct {
	Seller  common.Address
	TokenId *big.Int
	Price   *big.Int
	Amount  *big.Int
}, error) {
	return _Sale.Contract.Listings(&_Sale.CallOpts, arg0)
}

// Listings is a free data retrieval call binding the contract method 0xde74e57b.
//
// Solidity: function listings(uint256 ) view returns(address seller, uint256 tokenId, uint256 price, uint256 amount)
func (_Sale *SaleCallerSession) Listings(arg0 *big.Int) (struct {
	Seller  common.Address
	TokenId *big.Int
	Price   *big.Int
	Amount  *big.Int
}, error) {
	return _Sale.Contract.Listings(&_Sale.CallOpts, arg0)
}

// TokenContract is a free data retrieval call binding the contract method 0x55a373d6.
//
// Solidity: function tokenContract() view returns(address)
func (_Sale *SaleCaller) TokenContract(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Sale.contract.Call(opts, &out, "tokenContract")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// TokenContract is a free data retrieval call binding the contract method 0x55a373d6.
//
// Solidity: function tokenContract() view returns(address)
func (_Sale *SaleSession) TokenContract() (common.Address, error) {
	return _Sale.Contract.TokenContract(&_Sale.CallOpts)
}

// TokenContract is a free data retrieval call binding the contract method 0x55a373d6.
//
// Solidity: function tokenContract() view returns(address)
func (_Sale *SaleCallerSession) TokenContract() (common.Address, error) {
	return _Sale.Contract.TokenContract(&_Sale.CallOpts)
}

// BuyToken is a paid mutator transaction binding the contract method 0x2d296bf1.
//
// Solidity: function buyToken(uint256 listingId) payable returns()
func (_Sale *SaleTransactor) BuyToken(opts *bind.TransactOpts, listingId *big.Int) (*types.Transaction, error) {
	return _Sale.contract.Transact(opts, "buyToken", listingId)
}

// BuyToken is a paid mutator transaction binding the contract method 0x2d296bf1.
//
// Solidity: function buyToken(uint256 listingId) payable returns()
func (_Sale *SaleSession) BuyToken(listingId *big.Int) (*types.Transaction, error) {
	return _Sale.Contract.BuyToken(&_Sale.TransactOpts, listingId)
}

// BuyToken is a paid mutator transaction binding the contract method 0x2d296bf1.
//
// Solidity: function buyToken(uint256 listingId) payable returns()
func (_Sale *SaleTransactorSession) BuyToken(listingId *big.Int) (*types.Transaction, error) {
	return _Sale.Contract.BuyToken(&_Sale.TransactOpts, listingId)
}

// ListToken is a paid mutator transaction binding the contract method 0xbce64a7d.
//
// Solidity: function listToken(uint256 tokenId, uint256 price, uint256 amount) returns()
func (_Sale *SaleTransactor) ListToken(opts *bind.TransactOpts, tokenId *big.Int, price *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _Sale.contract.Transact(opts, "listToken", tokenId, price, amount)
}

// ListToken is a paid mutator transaction binding the contract method 0xbce64a7d.
//
// Solidity: function listToken(uint256 tokenId, uint256 price, uint256 amount) returns()
func (_Sale *SaleSession) ListToken(tokenId *big.Int, price *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _Sale.Contract.ListToken(&_Sale.TransactOpts, tokenId, price, amount)
}

// ListToken is a paid mutator transaction binding the contract method 0xbce64a7d.
//
// Solidity: function listToken(uint256 tokenId, uint256 price, uint256 amount) returns()
func (_Sale *SaleTransactorSession) ListToken(tokenId *big.Int, price *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _Sale.Contract.ListToken(&_Sale.TransactOpts, tokenId, price, amount)
}