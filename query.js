module.exports = `
    KubePodInventory 
    | where TimeGenerated > ago(5m) 
    | count
`;
