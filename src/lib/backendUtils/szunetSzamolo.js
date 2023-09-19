export function timeToMs(time) {
	// return Date.parse(new Date(new Date().setHours(...time.split(':'))).toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' }));	// Unix time
	const splitTime = time.split(':');
	return splitTime[0] * 3600000 + splitTime[1] * 60000 + splitTime[2] * 1000;
}

export function szunet(most = timeToMs(new Date().toLocaleTimeString('hu-HU', { timeZone: 'Europe/Budapest' }))) {
	if (most < timeToMs('08:00:00'))
		return [ '1. Óra előtt','2. Óra előtti szünet','3. Óra előtti szünet','4. Óra előtti szünet','5. Óra előtti szünet','6. Óra előtti szünet' ];
	else if (most < timeToMs('08:55:00'))
		return [ '2. Óra előtti szünet','3. Óra előtti szünet','4. Óra előtti szünet','5. Óra előtti szünet','6. Óra előtti szünet' ];
	else if (most < timeToMs('09:50:00'))
		return [ '3. Óra előtti szünet','4. Óra előtti szünet','5. Óra előtti szünet','6. Óra előtti szünet' ];
	else if (most < timeToMs('10:45:00'))
		return [ '4. Óra előtti szünet','5. Óra előtti szünet','6. Óra előtti szünet' ];
	else if (most < timeToMs('11:40:00'))
		return [ '5. Óra előtti szünet','6. Óra előtti szünet' ];
	else if (most < timeToMs('12:45:00'))
		return [ '6. Óra előtti szünet' ];
	else
		return [];
}