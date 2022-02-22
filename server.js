const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

function nextQuestion() {
    startQuestion()
} 

function createDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the new department called?'
        }
    ])
    .then(answer => {
        const newDepartment = `INSERT INTO departments (name) VALUES (?)`;
    
        return db.promise().query(newDepartment, answer.name).then(nextQuestion()) 
    })
}

function createRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is this roles title?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'How much does this role pay?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What department is this in?'
        }
    ])
    .then(answer => {
        const newRole = `INSERT INTO role VALUES (DEFAULT, ?, ?, ?)`;

        db.promise().query(newRole, [answer.title, answer.salary, answer.department_id]).then(nextQuestion())
    })
}

function createEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is their first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is their last name?'
        },
        {
            type: 'number',
            name: 'emp_role_id',
            message: 'What is their role?'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'Who is their manager?'
        }
    ])
    .then(answer => {
        const newEmployee = `INSERT INTO employee (first_name, last_name, emp_role_id, manager_id) VALUES (?,?,?,?)`;

        db.promise().query(newEmployee, [answer.first_name, answer.last_name, answer.emp_role_id, answer.manager_id]).then(nextQuestion())
    })
}

function updateEmployee() {
    //WHEN I choose to update an employee role
    //THEN I am prompted to select an employee to update and their new role and this information is updated in the database
    const employees = 'SELECT * FROM employee'
    db.promise().query(employees)
    .then(([rows]) => {
        let employees = rows

        const employeeChoices = employees.map(({id, first_name, last_name}) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                message: 'Who would you like to update?',
                choices: employeeChoices
            }
        ])
        .then(res => {
            console.log('id: ', res)
            let query = `SELECT * FROM employee WHERE id = ${res.updateEmployee}`
            db.promise().query(query)
            .then(([rows]) => {
                inquirer.prompt([
                    {
                        type: 'number',
                        name: 'newEmployeeRole',
                        message: 'What is their new role ID?'
                    },
                    {
                        type: 'number',
                        name: 'newManager',
                        message: 'What is their new managers ID?'
                    }
                ])
                .then(({newEmployeeRole, newManager}) => {
                    let query = `UPDATE employee SET emp_role_id = ${newEmployeeRole} and manager_id = ${newManager} WHERE id = ${res.updateEmployee}`
                    return db.promise().query(query).then(([rows, feilds]) => {
                        nextQuestion()
                    });
                })
            })
        })
    })
}

function startQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'home',
            message: 'What would you like to do?',
            choices: [
                'view departments', 
                'view roles', 
                'view employees', 
                'new department', 
                'new role', 
                'new employee', 
                'update employee role',
                'exit'
            ]
        }
    ]).then(answer => {
        switch (answer.home) {
            case 'view departments':
                const departments = `SELECT * FROM departments`;
                
                return db.promise().query(departments) 
                .then(([rows, feilds]) => {
                    console.table(rows)
                    nextQuestion()
                });
                break;
            case 'view roles':
                const roles = `SELECT r.id AS ID, 
                r.title AS Title,
                r.salary AS Salary,
                d.name AS Department
                FROM role r
                LEFT JOIN departments d
                ON r.department_id = d.id`;
                
                return db.promise().query(roles) 
                .then(([rows, feilds]) => {
                    console.table(rows)
                    nextQuestion()
                })
                break;
            case 'view employees':
                const employees = `SELECT e.id AS ID, 
                e.first_name AS First, 
                e.last_name AS Last, 
                r.title AS Role, 
                r.salary AS Salary, 
                d.name AS Department,
                m.last_name AS Manager
                FROM employee e 
                LEFT JOIN employee m
                ON e.manager_id = m.id
                LEFT JOIN role r 
                ON e.emp_role_id = r.id 
                LEFT JOIN departments d 
                ON r.department_id = d.id`;
                
                return db.promise().query(employees) 
                .then(([rows, feilds]) => {
                    console.table(rows)
                    nextQuestion()
                })
                break;
            case 'new department':
                createDepartment()
                break;
            case 'new role':
                createRole()
                break;
            case 'new employee':
                createEmployee()
                break;
            case 'update employee role':
                updateEmployee()
                break;
            case 'exit':
                console.log('goodbye')
                process.exit()
                break;
        }
    }); 
};

startQuestion()