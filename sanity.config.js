import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {LuShare2, LuUserCircle2} from 'react-icons/lu'

export default defineConfig({
  title: 'Digiabdelart-Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_PROJECT_DATASET,

  plugins: [
    deskTool({
      structure: (S, context) => {
        /* Structure code */
        return S.list()
          .title('Content')
          .items([
            // Minimum required configuration
            orderableDocumentListDeskItem({
              type: 'illustrations',
              title: 'Illustrations',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'concept-art',
              title: 'Concept Art & Character Design',
              S,
              context,
            }),
            S.listItem()
              .title('About')
              .child(S.document().schemaType('about').documentId('about'))
              .icon(LuUserCircle2),
            S.listItem()
              .title('Contacts')
              .child(S.document().schemaType('contacts').documentId('contacts'))
              .icon(LuShare2),
          ])
      },
    }),
    visionTool(),
    vercelDeployTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
