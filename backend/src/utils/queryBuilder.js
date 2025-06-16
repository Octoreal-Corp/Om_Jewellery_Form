export function buildFilterQuery(query, userType = "single") {
  const filters = [];
  const values = [];
  let idx = 1;

  
  if (query.pincode) {
    filters.push(`pincode = $${idx++}`);
    values.push(query.pincode);
  }
  if (query.phone) {
    filters.push(`phone = $${idx++}`);
    values.push(query.phone);
  }
  if (query.address) {
    filters.push(`address ILIKE $${idx++}`);
    values.push(`%${query.address}%`);
  }
  if (query.created_after) {
    filters.push(`created_at >= $${idx++}`);
    values.push(query.created_after);
  }
  if (query.created_before) {
    filters.push(`created_at <= $${idx++}`);
    values.push(query.created_before);
  }

  if (query.marital_status) {
    filters.push(`marital_status = $${idx++}`);
    values.push(query.marital_status);
  }

  
  if (userType === "single") {
    if (query.name) {
      filters.push(`husband_name ILIKE $${idx++}`);
      values.push(`%${query.name}%`);
    }
    if (query.community) {
      filters.push(`husband_samaj = $${idx++}`);
      values.push(query.community);
    }
    if (query.samaj) {
      filters.push(`husband_samaj = $${idx++}`);
      values.push(query.samaj);
    }
    if (query.occupation) {
      filters.push(`husband_occupation = $${idx++}`);
      values.push(query.occupation);
    }
    if (query.age_min || query.age_max) {
      filters.push(`husband_dob IS NOT NULL`);
    }
  }

  
  if (userType === "couple") {
    if (query.husband_name) {
      filters.push(`husband_name ILIKE $${idx++}`);
      values.push(`%${query.husband_name}%`);
    }
    if (query.wife_name) {
      filters.push(`wife_name ILIKE $${idx++}`);
      values.push(`%${query.wife_name}%`);
    }
    if (query.husband_samaj) {
      filters.push(`husband_samaj = $${idx++}`);
      values.push(query.husband_samaj);
    }
    if (query.wife_samaj) {
      filters.push(`wife_samaj = $${idx++}`);
      values.push(query.wife_samaj);
    }
    if (query.anniversary_month) {
      filters.push(`EXTRACT(MONTH FROM anniversary_date) = $${idx++}`);
      values.push(query.anniversary_month);
    }
    if (query.age_min || query.age_max) {
      filters.push(`(husband_dob IS NOT NULL OR wife_dob IS NOT NULL)`);
    }
  }

  return {
    whereClause: filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "",
    values,
  };
}
