import {defineField, defineType} from 'sanity'
export default defineType({name:'personnel', title:'Personnel', type:'document', fields:[
  defineField({name:'title', title:'Title', type:'string'}), defineField({name:'subtitle', title:'Subtitle', type:'string'}), defineField({name:'photo', title:'Photo', type:'image', options:{hotspot:true}}),
  defineField({name:'sax', title:'Sax', type:'string'}), defineField({name:'piano', title:'Piano', type:'string'}), defineField({name:'bass', title:'Bass', type:'string'}),
  defineField({name:'drums', title:'Drums', type:'string'}), defineField({name:'guitar', title:'Guitar', type:'string'}), defineField({name:'note', title:'Note', type:'string'})
]})
