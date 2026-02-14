import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { default as KaoruBirthday2026 } from "./KaoruBirthday2026.js"

const Private = () => {
	const { slug } = useParams()
	
	if (slug === "kaoru-birthday-2026") {
		return <KaoruBirthday2026 />
	}
	return <p>Sorry, "{slug}" not found</p>
};

export default Private;
