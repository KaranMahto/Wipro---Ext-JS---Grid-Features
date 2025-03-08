document.addEventListener("DOMContentLoaded", function() {
    console.log("Checking Ext inside app.js...");

    if (typeof Ext === "undefined") {
        console.error("Ext is not defined! Fix Ext JS loading.");
        return;
    }

    Ext.onReady(function() {
        console.log("Ext JS Ready! Creating Grid...");

        var store = Ext.create('Ext.data.Store', {
            fields: ['name', 'age', 'department'],
            pageSize: 2,
            proxy: {
                type: 'memory',
                enablePaging: true
            },
            data: [
                { name: 'Alice', age: 30, department: 'HR' },
                { name: 'Bob', age: 35, department: 'IT' },
                { name: 'Charlie', age: 28, department: 'Finance' },
                { name: 'David', age: 40, department: 'Marketing' },
                { name: 'Eve', age: 32, department: 'Sales' }
            ]
        });

        var grid = Ext.create('Ext.grid.Panel', {
            renderTo: 'grid-container',
            width: 600,
            height: 400,
            title: 'Employee List',
            store: store,
            columns: [
                { text: 'Name', dataIndex: 'name', flex: 1, sortable: true },
                { text: 'Age', dataIndex: 'age', flex: 1, sortable: true },
                { text: 'Department', dataIndex: 'department', flex: 1 }
            ],
            tbar: [
                {
                    text: 'Add Employee',
                    handler: function() {
                        var newEmployee = { name: 'New Employee', age: 25, department: 'New Dept' };
                        store.add(newEmployee);
                    }
                },
                {
                    text: 'Remove Selected',
                    handler: function() {
                        var selection = grid.getSelectionModel().getSelection();
                        if (selection.length) {
                            store.remove(selection);
                        } else {
                            alert('Select a row to remove.');
                        }
                    }
                }
            ],
            selModel: 'rowmodel',
            bbar: {
                xtype: 'pagingtoolbar',
                store: store,
                displayInfo: true
            }
        });
    });
});

