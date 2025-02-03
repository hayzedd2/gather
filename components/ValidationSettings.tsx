// const ValidationSettings = ({ field }: { field: FormField }) => {
//   switch (field.type) {
//     case "text":
//     case "textarea":
//       return (
//         <div className="space-y-3">
//           <Label>Validation</Label>
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <Label className="text-xs">Min Length</Label>
//               <Input
//                 type="number"
//                 value={field.validation?.minLength || ""}
//                 onChange={(e) =>
//                   updateField(field.id, {
//                     validation: {
//                       ...field.validation,
//                       minLength: e.target.value
//                         ? parseInt(e.target.value)
//                         : undefined,
//                     },
//                   })
//                 }
//               />
//             </div>
//             <div>
//               <Label className="text-xs">Max Length</Label>
//               <Input
//                 type="number"
//                 value={field.validation?.maxLength || ""}
//                 onChange={(e) =>
//                   updateField(field.id, {
//                     validation: {
//                       ...field.validation,
//                       maxLength: e.target.value
//                         ? parseInt(e.target.value)
//                         : undefined,
//                     },
//                   })
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       );
//     case "number":
//       return (
//         <div className="space-y-3">
//           <Label>Validation</Label>
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <Label className="text-xs">Min Value</Label>
//               <Input
//                 type="number"
//                 value={field.validation?.min || ""}
//                 onChange={(e) =>
//                   updateField(field.id, {
//                     validation: {
//                       ...field.validation,
//                       min: e.target.value
//                         ? parseInt(e.target.value)
//                         : undefined,
//                     },
//                   })
//                 }
//               />
//             </div>
//             <div>
//               <Label className="text-xs">Max Value</Label>
//               <Input
//                 type="number"
//                 value={field.validation?.max || ""}
//                 onChange={(e) =>
//                   updateField(field.id, {
//                     validation: {
//                       ...field.validation,
//                       max: e.target.value
//                         ? parseInt(e.target.value)
//                         : undefined,
//                     },
//                   })
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       );
//     default:
//       return null;
//   }
// };