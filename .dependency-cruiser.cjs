/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    { name: "no-cycles", severity: "error", from: {}, to: { circular: true } },
    {
      name: "ui-no-import-services",
      severity: "error",
      from: { path: "^src/components" },
      to: { path: "^src/services" },
    },
    {
      name: "only-downwards",
      severity: "warn",
      from: { path: "^src/components/([^/]+)/" },
      to: { path: "^src/components/(?!\\1)/" },
    },
  ],
  options: { exclude: "node_modules|\\.test\\.(t|j)sx?$|@/assets/" },
};
