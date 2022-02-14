INSERT INTO departments (name)
VALUES
    ('cash'),
    ('paint'),
    ('plumbing'),
    ('yard'),
    ('customer service'),
    ('office')
;

INSERT INTO role (title, salary, department_id)
VALUES
    ('cashier', 25000, 1),/* 1 */
    ('cash supervisor', 33000, 1),/* 2 */
    ('cash manager', 40000, 1),/* 3 */
    ('paint associate', 27500, 2),/* 4 */
    ('paint manager', 35000, 2),/* 5 */
    ('plumbing associate', 27500, 3),/* 6 */
    ('plumbiing manager', 35000, 3),/* 7 */
    ('yard associate', 25000, 4),/* 8 */
    ('yard manager', 33000, 4),/* 9 */
    ('customer service rep', 30000, 5),/* 10 */
    ('payrole', 30000, 6),/* 11 */
    ('reciver', 32000, 6),/* 12 */
    ('store manager', 55000, 6)/* 13 */
;

INSERT INTO employee (first_name, last_name, emp_role_id, manager_id)
VALUES
    ('James', 'Fraser', 13, NULL),
    ('Jack', 'London', 3, 1),
    ('Robert', 'Bruce', 2, 2),
    ('Peter', 'Greenaway', 1, 3),
    ('Derek', 'Jarman', 1, 3),
    ('Paolo', 'Pasolini', 1, 3),
    ('Sandy', 'Powell', 1, 3),
    ('Emil', 'Zola', 1, 3),
    ('Sissy', 'Coalpits', 5, 1),
    ('Antoinette', 'Capet', 4, 9),/* 10 */
    ('Samuel', 'Delany', 4, 9),
    ('Tony', 'Duvert', 4, 9),
    ('Dennis', 'Cooper', 7, 1),
    ('Monica', 'Bellucci', 6, 13),
    ('Samuel', 'Johnson', 6, 13),
    ('John', 'Dryden', 9, 1),
    ('Alexander', 'Pope', 8, 16),
    ('Lionel', 'Johnson', 8, 16),
    ('Aubrey', 'Beardsley', 8, 16),
    ('Tulse', 'Luper', 8, 16),
    ('William', 'Morris', 10, 1),
    ('George', 'Shaw', 10, 1),
    ('Rhoda', 'Broughton', 10, 1),
    ('Hart', 'Crane', 11, 1),
    ('Vitorio', 'DeSica', 12, 1)
;