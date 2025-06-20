-- Database Setup Script for Team Members
-- Run this as a database administrator

-- Create development database if it doesn't exist
CREATE DATABASE nextjs_boilerplate_dev;

-- Create individual users for each team member
CREATE USER jose_dev WITH PASSWORD 'jose_secure_pass_123';
CREATE USER norma_dev WITH PASSWORD 'norma_secure_pass_456';
CREATE USER lily_dev WITH PASSWORD 'lily_secure_pass_789';

-- Grant appropriate permissions to each user
GRANT ALL PRIVILEGES ON DATABASE nextjs_boilerplate_dev TO jose_dev;
GRANT ALL PRIVILEGES ON DATABASE nextjs_boilerplate_dev TO norma_dev;
GRANT ALL PRIVILEGES ON DATABASE nextjs_boilerplate_dev TO lily_dev;

-- Connect to the development database to set schema permissions
\c nextjs_boilerplate_dev;

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO jose_dev;
GRANT ALL ON SCHEMA public TO norma_dev;
GRANT ALL ON SCHEMA public TO lily_dev;

-- Grant permissions on all tables and sequences
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO jose_dev;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO norma_dev;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO lily_dev;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO jose_dev;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO norma_dev;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO lily_dev;

-- Set default privileges for future tables and sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO jose_dev, norma_dev, lily_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO jose_dev, norma_dev, lily_dev;
