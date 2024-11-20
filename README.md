# 🏗 Scaffold-Hyperlane

Scaffold-ETH 2 meets Hyperlane, enabling developers to build cross-chain applications with seamless messaging and asset bridging.

With Hyperlane integration, you can:

- Deploy Hyperlane core contracts on multiple chains.
- Use Warp Routes to transfer assets (e.g., ETH or ERC20 tokens) between chains.
- Test cross-chain messaging locally with minimal setup.

For general Scaffold-ETH 2 features and usage, visit the original documentation.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)
- Hyperlane CLI: Install with:
  ```
  npm install -g @hyperlane-xyz/cli
  ```

## Quickstart: Scaffold-ETH 2 with Hyperlane

1. Set Up Local Chains

   Run two local Ethereum chains using Foundry:

   - Start the first chain:

   ```
   yarn chain:1
   This runs on http://localhost:8545 with Chain ID 31337.
   ```

   - Start the second chain:

   ```
   yarn chain:2
   This runs on http://localhost:9545 with Chain ID 31338.
   ```

2. Add Chains to the Hyperlane Registry

   Register the chains with Hyperlane to make them recognizable for cross-chain messaging:

   ```
   hyperlane registry init
   ```

   Provide the following details when prompted:

   - Chain 1:
     Name: anvilchain1
     RPC URL: http://localhost:8545
     Chain ID: 31337
     Native Token: ETH with 18 decimals.
   - Chain 2:
     Name: anvilchain2
     RPC URL: http://localhost:9545
     Chain ID: 31338
     Native Token: ETH with 18 decimals.

3. Deploy Hyperlane Core Contracts

   Deploy the Mailbox and ISM contracts to enable cross-chain messaging:

   ```
   hyperlane core init
   hyperlane core deploy
   ```

   Select the chains (anvilchain1 and anvilchain2) when prompted.
   Check the deployed contract addresses in ~/.hyperlane/chains/<chain_name>/addresses.yaml.

4. Test Cross-Chain Messaging
   Verify the core contracts by sending a test message:

   ```
   hyperlane send message --relay
   ```
