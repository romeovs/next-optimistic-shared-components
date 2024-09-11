import { Count } from "../components/count"

type Props = {
	children: React.ReactNode
}

export default function Layout(props: Props) {
	return (
		<html>
			<body>
				{/* Count is rendered in the layout to make use of
					* incremental static rendering.
				  */}
				<Count />

				{props.children}
			</body>
		</html>
	)
}
