const readTemplate = (template, parent, data = { items: {} }) => {
  for (const [key, value] of Object.entries(template)) {
      data.items[key] = {
          index: key,
          canMove: true,
          isFolder: value !== null,
          children: value !== null ? Object.keys(value) : undefined,
          data: key,
          parent,
          canRename: true,
      };

      if (value !== null) {
          readTemplate(value, key, data);
      }
  }
  return data;
};


const longTreeTemplate = {
  root: {
      leftpane:{
    Eaxee: {
        //   Architecture1: {
        //       'Mussafara': null,
        //       'Anas': null,
        //       'Owais': null,
        //       'Riaz': null,
        //   },
        //   Architecture2: {
        //       'Germany': null,
        //       'Denmark': null,
        //   },
        //   Architecture3: {
        //       'Belgium': null,
        //       'Chicago': null,
        //       'Purdue': null,
        //   },
       
         

      }},
      RoleManagement: {
          Roles:{
              Admin:{
                  'Admin 1':null,
                  'Admin 2':null,
                  'Admin 3':null,
              },
              Metamodeler:{
                  'Metamodeler 1':null,
                  'Metamodeler 2':null,
                  'Metamodeler 3':null,
              },
          }},
          License: {
              

          },
  },
};

export const longTree = readTemplate(longTreeTemplate);
export const longTree1=readTemplate(longTreeTemplate);
export const longTree2=readTemplate(longTreeTemplate);

export default readTemplate;
