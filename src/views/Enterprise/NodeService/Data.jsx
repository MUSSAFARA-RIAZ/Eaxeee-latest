
export const getTreeNodes1 = async () => {

  return [

    {
      key: "0",
      label: "Tree1",
      data: "Documents Folder",
      icon: "pi pi-fw pi-inbox",


      menu: [
        {
          icon: "pi pi-plus",
          key: "0",
          label: "New Role",
          

        },

        {
          key: "0",
          label: "Other options",
          icon: "pi pi-plus",


        },
      ],

      children: [
        {
          key: "0-0",
          label: "Role",
          data: "Work Folder",
          icon: "pi pi-folder",

          Node: "child",

          menu: [
            {
              label: "Generate License",
              icon: "pi pi-plus",


            },
            {
              label: "Other Options",
              icon: "pi pi-plus",

            },
          ],
          children: [
            {
              key: "0-0-0",
              label: "Eaxee",
              icon: "pi pi-fw pi-file",
              data: "Eaxee",
              menu: [
                {
                  label: "Eaxee Context menu1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Eaxee Context menu2",
                  icon: "pi pi-plus",

                },
              ],

            },
            {
              key: "0-0-1",
              label: "Impex",
              icon: "pi pi-fw pi-file",
              data: "Impex",
              menu: [
                {
                  label: "Impex Context_m1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Impex Context menu2",
                  icon: "pi pi-plus",

                },
              ],
              options: ["Create resume", "Update Resume"],
            },
          ],
        },
        {
          key: "0-1",
          label: "User",
          data: "Home Folder",
          icon: "pi pi-folder",
          options: ["Home", "xyz"],
          children: [
            {
              key: "0-1-0",
              label: "Mussafara",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-111",
              label: "Anas",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "Anas option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Anas option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-24444",
              label: "Owais",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "Owais option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Owais option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-2000",
              label: "Riaz",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "riaz option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "riaz option2",
                  icon: "pi pi-plus",

                },
              ],
            },
          ],
        },
      ],
    }
  ];
};

export const getTreeNodes2 = async () => {

  return [

    {
      key: "0",
      label: "Tree2",
      data: "Documents Folder",
      icon: "pi pi-fw pi-inbox",


      menu: [
        {
          key: "111",
          label: "New Role",
          icon: "pi pi-plus",

        },

        {
          key: "999",
          label: "Other options",
          icon: "pi pi-plus",


        },
      ],

      children: [
        {
          key: "0-0",
          label: "Role",
          data: "Work Folder",
          icon: "pi pi-folder",


          Node: "child",

          menu: [
            {
              label: "Generate License",
              icon: "pi pi-plus",


            },
            {
              label: "Other Options",
              icon: "pi pi-plus",

            },
          ],
          children: [
            {
              key: "0-0-0",
              label: "Eaxee",
              icon: "pi pi-fw pi-file",
              data: "Eaxee",
              menu: [
                {
                  label: "Eaxee Context menu1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Eaxee Context menu2",
                  icon: "pi pi-plus",

                },
              ],

            },
            {
              key: "0-0-1",
              label: "Impex",
              icon: "pi pi-fw pi-file",
              data: "Impex",
              menu: [
                {
                  label: "Impex Context_m1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Impex Context menu2",
                  icon: "pi pi-plus",

                },
              ],
              options: ["Create resume", "Update Resume"],
            },
          ],
        },
        {
          key: "0-1",
          label: "User",
          data: "Home Folder",
          icon: "pi pi-folder",
          options: ["Home", "xyz"],
          children: [
            {
              key: "0-1-0",
              label: "Mussafara",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-111",
              label: "Anas",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "Anas option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Anas option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-24444",
              label: "Owais",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "Owais option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Owais option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-2000",
              label: "Riaz",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "riaz option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "riaz option2",
                  icon: "pi pi-plus",

                },
              ],
            },
          ],
        },
      ],
    }
  ];
};


export const getTreeNodes3 = async () => {

  return [

    {
      key: "0",
      label: "Tree3",
      data: "Documents Folder",
  icon: "pi pi-fw pi-inbox",

      menu: [
        {
          key: "111",
          label: "New Role",
          icon: "pi pi-plus",

        },

        {
          key: "999",
          label: "Other options",
          icon: "pi pi-plus",


        },
      ],

      children: [
        {
          key: "0-0",
          label: "Role",
          data: "Work Folder",
          icon: "pi pi-folder",

          Node: "child",

          menu: [
            {
              label: "Generate License",
              icon: "pi pi-plus",


            },
            {
              label: "Other Options",
              icon: "pi pi-plus",

            },
          ],
          children: [
            {
              key: "0-0-0",
              label: "Eaxee",
              icon: "pi pi-fw pi-file",
              data: "Eaxee",
              menu: [
                {
                  label: "Eaxee Context menu1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Eaxee Context menu2",
                  icon: "pi pi-plus",

                },
              ],

            },
            {
              key: "0-0-1",
              label: "Impex",
              icon: "pi pi-fw pi-file",
              data: "Impex",
              menu: [
                {
                  label: "Impex Context_m1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Impex Context menu2",
                  icon: "pi pi-plus",

                },
              ],
              options: ["Create resume", "Update Resume"],
            },
          ],
        },
        {
          key: "0-1",
          label: "User",
          data: "Home Folder",
          icon: "pi pi-folder",
          options: ["Home", "xyz"],
          children: [
            {
              key: "0-1-0",
              label: "Mussafara",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-111",
              label: "Anas",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "Anas option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Anas option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-24444",
              label: "Owais",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "Owais option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Owais option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-2000",
              label: "Riaz",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "riaz option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "riaz option2",
                  icon: "pi pi-plus",

                },
              ],
            },
          ],
        },
      ],
    }
  ];
};

export const getTreeNodes4 = async () => {

  return [

    
    {
      key: "0",
      label: "Tree4",
      data: "Documents Folder",
      icon: "pi pi-fw pi-inbox",


      menu: [
        {
          key: "111",
          label: "New Role",
          icon: "pi pi-plus",

        },

        {
          key: "999",
          label: "Other options",
          icon: "pi pi-plus",


        },
      ],

      children: [
        {
          key: "0-0",
          label: "Role",
          data: "Work Folder",
          icon: "pi pi-folder",

          Node: "child",

          menu: [
            {
              label: "Generate License",
              icon: "pi pi-plus",


            },
            {
              label: "Other Options",
              icon: "pi pi-plus",

            },
          ],
          children: [
            {
              key: "0-0-0",
              label: "Eaxee",
              icon: "pi pi-fw pi-file",
              data: "Eaxee",
              menu: [
                {
                  label: "Eaxee Context menu1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Eaxee Context menu2",
                  icon: "pi pi-plus",

                },
              ],

            },
            {
              key: "0-0-1",
              label: "Impex",
              icon: "pi pi-fw pi-file",
              data: "Impex",
              menu: [
                {
                  label: "Impex Context_m1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Impex Context menu2",
                  icon: "pi pi-plus",

                },
              ],
              options: ["Create resume", "Update Resume"],
            },
          ],
        },
        {
          key: "0-1",
          label: "User",
          data: "Home Folder",
          icon: "pi pi-folder",
          options: ["Home", "xyz"],
          children: [
            {
              key: "0-1-0",
              label: "Mussafara",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-111",
              label: "Anas",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "Anas option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Anas option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-24444",
              label: "Owais",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "Owais option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Owais option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-2000",
              label: "Riaz",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "riaz option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "riaz option2",
                  icon: "pi pi-plus",

                },
              ],
            },
          ],
        },
      ],
    }
  ];
};


export const getTreeNodes5 = async () => {

  return [

    {
      key: "0",
      label: "Tree5",
      data: "Documents Folder",
      icon: "pi pi-fw pi-inbox",


      menu: [
        {
          key: "111",
          label: "New Role",
          icon: "pi pi-plus",

        },

        {
          key: "999",
          label: "Other options",
          icon: "pi pi-plus",


        },
      ],

      children: [
        {
          key: "0-0",
          label: "Role",
          data: "Work Folder",
          icon: "pi pi-folder",

          Node: "child",

          menu: [
            {
              label: "Generate License",
              icon: "pi pi-plus",


            },
            {
              label: "Other Options",
              icon: "pi pi-plus",

            },
          ],
          children: [
            {
              key: "0-0-0",
              label: "Eaxee",
              icon: "pi pi-fw pi-file",
              data: "Eaxee",
              menu: [
                {
                  label: "Eaxee Context menu1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Eaxee Context menu2",
                  icon: "pi pi-plus",

                },
              ],

            },
            {
              key: "0-0-1",
              label: "Impex",
              icon: "pi pi-fw pi-file",
              data: "Impex",
              menu: [
                {
                  label: "Impex Context_m1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Impex Context menu2",
                  icon: "pi pi-plus",

                },
              ],
              options: ["Create resume", "Update Resume"],
            },
          ],
        },
        {
          key: "0-1",
          label: "User",
          data: "Home Folder",
          icon: "pi pi-folder",
          options: ["Home", "xyz"],
          children: [
            {
              key: "0-1-0",
              label: "Mussafara",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-111",
              label: "Anas",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "Anas option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Anas option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-24444",
              label: "Owais",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "Owais option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "Owais option2",
                  icon: "pi pi-plus",

                },
              ],
            },
            {
              key: "0-1-2000",
              label: "Riaz",
              icon: "pi pi-fw pi-file",
              data: "Invoices for this month",
              menu: [
                {
                  label: "riaz option1",
                  icon: "pi pi-plus",


                },
                {
                  label: "riaz option2",
                  icon: "pi pi-plus",

                },
              ],
            },
          ],
        },
      ],
    }
  ];
};
