import pool from "../db/db.js";

export async function createUser(userData) {
  
  const isCouple = userData.husband_name && userData.wife_name;

  if (isCouple) {
    
    const {
      marital_status,
      husband_name,
      wife_name,
      phone,
      whatsapp,
      husband_dob,
      wife_dob,
      anniversary_date,
      husband_occupation,
      wife_occupation,
      husband_samaj,
      wife_samaj,
      address,
      pincode,
      gender
    } = userData;

    const query = `
      INSERT INTO customers (
        marital_status,
        husband_name,
        wife_name,
        phone,
        whatsapp,
        husband_dob,
        wife_dob,
        anniversary_date,
        husband_occupation,
        wife_occupation,
        husband_samaj,
        wife_samaj,
        address,
        pincode,
        gender
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *;
    `;

    const values = [
      marital_status,
      husband_name,
      wife_name,
      phone,
      whatsapp,
      husband_dob,
      wife_dob,
      anniversary_date,
      husband_occupation,
      wife_occupation,
      husband_samaj,
      wife_samaj,
      address,
      pincode,
      gender || 'Not specified'
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  } else {
    
    const {
      marital_status,
      name,
      phone,
      whatsapp,
      dob,
      occupation,
      community,
      samaj,
      address,
      pincode,
      gender,
      
    } = userData;

    const query = `
      INSERT INTO customers (
        marital_status,
        name,
        phone,
        whatsapp,
        dob,
        occupation,
        community,
        samaj,
        address,
        pincode,
        gender,
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

    const values = [
      marital_status,
      name,
      phone,
      whatsapp,
      dob,
      occupation,
      community,
      samaj,
      address,
      pincode,
      gender || 'Not specified'
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}


export async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM customers ORDER BY user_id DESC");
  return rows;
}


export async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM customers WHERE user_id = $1", [id]);
  return rows[0];
}


export async function updateUser(id, userData) {
  const fields = Object.keys(userData);
  const values = Object.values(userData);

  const setString = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");

  const query = `
    UPDATE customers
    SET ${setString}, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $${fields.length + 1}
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [...values, id]);
  return rows[0];
}


export async function deleteUser(id) {
  const { rows } = await pool.query("DELETE FROM customers WHERE user_id = $1 RETURNING *", [id]);
  return rows[0];
}


export async function getFilteredUsers(filters = {}, pagination = {}) {
  const { 
    name, 
    husband_name, 
    wife_name, 
    pincode, 
    community, 
    samaj, 
    husband_samaj, 
    wife_samaj,
    occupation,
    husband_occupation,
    wife_occupation,
    marital_status,
    age_min,
    age_max,
    anniversary_month,
    created_after,
    created_before
  } = filters;

  const { 
    page = 1, 
    limit = 10, 
    sort_by = 'user_id', 
    sort_order = 'DESC' 
  } = pagination;

  let whereConditions = [];
  let queryParams = [];
  let paramIndex = 1;

  
  if (name) {
    whereConditions.push(`name ILIKE $${paramIndex}`);
    queryParams.push(`%${name}%`);
    paramIndex++;
  }

  if (husband_name) {
    whereConditions.push(`husband_name ILIKE $${paramIndex}`);
    queryParams.push(`%${husband_name}%`);
    paramIndex++;
  }

  if (wife_name) {
    whereConditions.push(`wife_name ILIKE $${paramIndex}`);
    queryParams.push(`%${wife_name}%`);
    paramIndex++;
  }

  if (pincode) {
    whereConditions.push(`pincode = $${paramIndex}`);
    queryParams.push(pincode);
    paramIndex++;
  }

  if (community) {
    whereConditions.push(`community ILIKE $${paramIndex}`);
    queryParams.push(`%${community}%`);
    paramIndex++;
  }

  if (samaj) {
    whereConditions.push(`samaj ILIKE $${paramIndex}`);
    queryParams.push(`%${samaj}%`);
    paramIndex++;
  }

  if (husband_samaj) {
    whereConditions.push(`husband_samaj ILIKE $${paramIndex}`);
    queryParams.push(`%${husband_samaj}%`);
    paramIndex++;
  }

  if (wife_samaj) {
    whereConditions.push(`wife_samaj ILIKE $${paramIndex}`);
    queryParams.push(`%${wife_samaj}%`);
    paramIndex++;
  }

  if (occupation) {
    whereConditions.push(`occupation ILIKE $${paramIndex}`);
    queryParams.push(`%${occupation}%`);
    paramIndex++;
  }

  if (husband_occupation) {
    whereConditions.push(`husband_occupation ILIKE $${paramIndex}`);
    queryParams.push(`%${husband_occupation}%`);
    paramIndex++;
  }

  if (wife_occupation) {
    whereConditions.push(`wife_occupation ILIKE $${paramIndex}`);
    queryParams.push(`%${wife_occupation}%`);
    paramIndex++;
  }

  if (marital_status) {
    whereConditions.push(`marital_status = $${paramIndex}`);
    queryParams.push(marital_status);
    paramIndex++;
  }

  // Age filtering for single users
  if (age_min && age_max) {
    whereConditions.push(`dob BETWEEN $${paramIndex} AND $${paramIndex + 1}`);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - age_min);
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - age_max);
    console.log("Filtering DOB between:");
    console.log("minDate:", minDate.toISOString().substring(0, 10)); // oldest
    console.log("maxDate:", maxDate.toISOString().substring(0, 10)); // youngest
    queryParams.push(minDate.toISOString().substring(0, 10)); 
    queryParams.push(maxDate.toISOString().substring(0, 10));
    paramIndex += 2;
  }

  // Anniversary month filtering
  if (anniversary_month) {
    whereConditions.push(`EXTRACT(MONTH FROM anniversary_date) = $${paramIndex}`);
    queryParams.push(anniversary_month);
    paramIndex++;
  }

  // Date range filtering
  if (created_after) {
    whereConditions.push(`created_at >= $${paramIndex}`);
    queryParams.push(created_after);
    paramIndex++;
  }

  if (created_before) {
    whereConditions.push(`created_at <= $${paramIndex}`);
    queryParams.push(created_before);
    paramIndex++;
  }

  
  const whereClause = whereConditions.length > 0 
    ? `WHERE ${whereConditions.join(' AND ')}` 
    : '';

  // Calculate offset
  const offset = (page - 1) * limit;

  // Main query
  const query = `
    SELECT * FROM customers
    ${whereClause}
    ORDER BY ${sort_by} ${sort_order}
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `;

  queryParams.push(limit, offset);

  // Count query for total records
  const countQuery = `
    SELECT COUNT(*) as total FROM customers
    ${whereClause}
  `;

  const countParams = queryParams.slice(0, queryParams.length - 2); // Remove limit and offset

  try {
    const [dataResult, countResult] = await Promise.all([
      pool.query(query, queryParams),
      pool.query(countQuery, countParams)
    ]);

    const totalRecords = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      data: dataResult.rows,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_records: totalRecords,
        limit: limit,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    };
  } catch (error) {
    throw error;
  }
}