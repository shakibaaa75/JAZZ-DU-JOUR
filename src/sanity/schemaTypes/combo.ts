import {defineField, defineType} from 'sanity'
export default defineType({name:'combo', title:'Combo', type:'document', fields:[
  defineField({name:'title', title:'Title', type:'string', validation:r=>r.required()}), defineField({name:'subtitle', title:'Subtitle', type:'string'}),
  defineField({name:'order', title:'Order', type:'number'}), defineField({name:'instruments', title:'Instruments', type:'array', of:[{type:'object', fields:[
    defineField({name:'label', title:'Label', type:'string'}), defineField({name:'icon', title:'Icon', type:'string', options:{list:['sax','bass','drums','piano','guitar','rec']}}),
    defineField({name:'lead', title:'Lead', type:'boolean'}), defineField({name:'ghost', title:'Ghost', type:'boolean'})
  ]}]})
]})
