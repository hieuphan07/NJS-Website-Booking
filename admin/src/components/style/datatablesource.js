export const userColumns = [
	{ field: '_id', headerName: 'ID', width: 250, sortable: false },
	{
		field: 'user',
		headerName: 'User',
		width: 230,
		sortable: false,
		renderCell: (params) => {
			return (
				<div className='cellWithImg'>
					<img
						className='cellImg'
						src={params.row.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
						alt='avatar'
					/>
					{params.row.user}
				</div>
			);
		},
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 230,
		sortable: false,
	},
	{
		field: 'fullname',
		headerName: 'Full Name',
		width: 230,
		sortable: false,
	},
	{
		field: 'phone',
		headerName: 'Phone',
		width: 100,
		sortable: false,
	},
];

export const hotelColumns = [
	{ field: '_id', headerName: 'ID', width: 250, sortable: false },
	{
		field: 'name',
		headerName: 'Name',
		width: 260,
		sortable: false,
	},
	{
		field: 'type',
		headerName: 'Type',
		width: 100,
		sortable: false,
	},
	{
		field: 'title',
		headerName: 'Title',
		width: 260,
		sortable: false,
	},
	{
		field: 'city',
		headerName: 'City',
		width: 100,
		sortable: false,
	},
];

export const roomColumns = [
	{ field: '_id', headerName: 'ID', width: 250, sortable: false },
	{
		field: 'title',
		headerName: 'Title',
		width: 250,
		sortable: false,
	},
	{
		field: 'desc',
		headerName: 'Description',
		width: 400,
		sortable: false,
	},
	{
		field: 'price',
		headerName: 'Price',
		width: 100,
		sortable: false,
	},
	{
		field: 'maxPeople',
		headerName: 'Max People',
		width: 100,
		sortable: false,
	},
];
