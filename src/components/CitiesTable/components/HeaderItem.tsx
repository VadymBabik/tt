interface HeaderItemProps {
	title: string;
}

const HeaderItem = ({ title }: HeaderItemProps) => {
	return <th className="p-4">{title}</th>;
};

export default HeaderItem;
