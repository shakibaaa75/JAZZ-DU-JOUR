import {defineField, defineType} from 'sanity'
export default defineType({name:'trackGroup', title:'Track Group', type:'document', fields:[
  defineField({name:'style', title:'Style', type:'string', validation:r=>r.required()}), defineField({name:'order', title:'Order', type:'number'}),
  defineField({name:'songs', title:'Songs', type:'array', of:[{type:'object', fields:[
    defineField({name:'title', title:'Title', type:'string', validation:r=>r.required()}), defineField({name:'file', title:'Audio URL / Path', type:'string', validation:r=>r.required()})
  ]}]})
]})
