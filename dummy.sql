-- Insert dummy data for the Staff table
INSERT INTO `ascendent-solution`.`Staff` (name)
VALUES
  ('Sarah Johnson'),
  ('Michael Brown'),
  ('Emily Davis');
-- Insert dummy data for the Client table
INSERT INTO `ascendent-solution`.`Client` (name, bday, address, company)
VALUES
  ('John Doe', '1990-01-15 00:00:00', '123 Main St', 'ABC Inc'),
  ('Alice Smith', '1985-05-20 00:00:00', '456 Elm St', 'XYZ Corp'),
  ('Bob Johnson', '1982-09-10 00:00:00', '789 Oak St', '123 Industries');
-- Insert dummy data for the Case table
INSERT INTO `ascendent-solution`.`Case` (status, creation_date, request_message, cid, eid)
VALUES
  ('OUTSTANDING', '2023-01-10 08:00:00', 'Urgent request', 1, 1),
  ('COMPLETED', '2023-02-20 14:30:00', 'Follow-up needed', 1, 2),
  ('OUTSTANDING', '2023-03-05 10:15:00', 'Legal advice', 2, 1),
  ('OUTSTANDING', '2023-03-12 16:45:00', 'Billing inquiry', 3, 3);