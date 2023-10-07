const config = {
  appId: '7f5c50ad-93bc-4676-bd61-361323646e47',
  tenantId: '3433e2f6-b674-4206-857c-124c3fcfead0',
  courseDirectoryExtensionID: '21e32d7f43914aafbd99827f65f734eb',
  studentDirectoryExtensionID: '0a09fe4eefd047798b49f80aaaecb550',
  redirectUri: 'http://localhost:3000',

  scopes: [
    'User.ReadWrite.All',
    'Directory.Read.All',
    'api://aee2e4b1-6610-447a-805b-e3f28994bf67/UpeaseUnified.ReadWrite.All'
  ],
};

export default config;