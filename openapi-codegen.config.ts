import { generateSchemaTypes } from '@openapi-codegen/typescript';
import { defineConfig } from '@openapi-codegen/cli';

export default defineConfig({
  backoffice: {
    from: {
      source: 'url',
      url: 'https://ics-c.epos-ip.org/development/k8s-epos-deploy/latest/api/v1/openapi.json',
    },
    outputDir: 'generated',
    to: async (context) => {
      await generateSchemaTypes(context, {
        filenamePrefix: 'backoffice',
      });
    },
  },
});
