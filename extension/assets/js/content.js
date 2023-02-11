
function injector(result) {
    if (result.isActive === true) {

        let injectedHTML = '<div class="injected-modal" id="injectedModal">\n' +
            '\n' +
            '    <div class="injected-modal__content">\n' +
            '        <div class="injected-modal__content-header">\n' +
            '            <h4 class="injected-modal__content-title" id="injectedModalUsername">Username</h4>\n' +
            '            <button class="injected-modal__content-close" id="injectedModalCloseButton">&times;</button>\n' +
            '        </div>\n' +
            '        <div class="injected-modal__content-body">\n' +
            '            <div class="injected-modal__content-balance">\n' +
            '                <h1 class="injected-modal__content-balance-amount" id="injectedModalBalance">100</h1>\n' +
            '                <span class="injected-modal__content-balance-percent" id="injectedModalDecimal">00</span>\n' +
            '            </div>\n' +
            '            <h4 class="injected-modal__content-balance-subtitle" id="injectedModalAddress">0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb</h4>\n' +
            '            <p class="injected-modal__content-balance-text">\n' +
            '                You can transfer FTM coin (Test net) to any .FTM / .FTMP.COM username decentralised and secure.\n' +
            '                This protocol is easier to use rather than classic ways.\n' +
            '                and will close us to the goals.\n' +
            '            </p>\n' +
            '        </div>\n' +
            '        <div class="injected-modal__content-footer">\n' +
            '            <button class="injected-modal__content-footer-button" id="injectedModalDonationButton">\n' +
            '                Tip FTM to this address\n' +
            '            </button>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '\n' +
            '</div>'

        document.querySelector('body').insertAdjacentHTML('beforeend',injectedHTML);

        let regex =  /(?:[\w-]+\.)?(\w+.ftmp\.com|\w+\.ftm)/gmi;
        document.body.innerHTML = document.body.innerHTML.replace(regex, function (username) {
            return `<button class="injected-btn"><span class="injected-span">${username}</span></button>`;
        });


        // accessing the elements with same classname
        const injectedButtons = document.querySelectorAll('.injected-btn');

        let injectedModal = document.getElementById('injectedModal');
        let injectedModalUsername = document.getElementById('injectedModalUsername');
        let injectedModalBalance = document.getElementById('injectedModalBalance');
        let injectedModalDecimal = document.getElementById('injectedModalDecimal');
        let injectedModalAddress = document.getElementById('injectedModalAddress');
        let injectedModalDonationButton = document.getElementById('injectedModalDonationButton');

        const configuration = {
            rpcProvider:'https://rpc.ftm.tools/',
            explorer: 'https://ftmscan.com',
            networkName: 'Fantom',
            symbol:'FTM',
            chainId: 250
        };
        const raveNameContract = '0x6A403FFbBF8545EE0d99a63A72e5f335dFCaE2Bd';
        const web3 = new Web3(configuration.rpcProvider);

        let contractJson = JSON.parse('[{"inputs": [{"internalType": "string","name": "_name","type": "string"}],"name": "getOwnerOfName","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"}]');
        let contract = new web3.eth.Contract(contractJson, raveNameContract);


        injectedModalDonationButton.onclick = function () {
            window.open('https://pwawallet.fantom.network/');
        }

        injectedButtons.forEach(injectedButton => {
            injectedButton.addEventListener('click', (e)=>{
                injectedModalUsername.innerText = injectedButton.innerText;
                contract.methods.getOwnerOfName(injectedButton.innerText).call({}, function(error, result){
                    injectedModalAddress.innerText = result;

                    web3.eth.getBalance(result)
                        .then(
                            function (result) {
                                injectedModalBalance.innerText = Math.floor(result*10**-18);
                                injectedModalDecimal.innerText = (result * 10 ** -18).toFixed(3).split('.')[1];
                            }
                        );
                });
                injectedModal.style.display = "flex";
            });
        });

        let injectedModalCloseButton = document.getElementById('injectedModalCloseButton');
        injectedModalCloseButton.onclick = function() {
            injectedModal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target === injectedModal) {
                injectedModal.style.display = "none";
            }
        }
    }
}

chrome.storage.sync.get(["isActive"]).then(injector);


