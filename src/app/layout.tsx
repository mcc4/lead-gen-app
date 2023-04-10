import SessionProvider from "@/app/components/sessionProvider";
import { getUser } from "@/server/user";
import Navigation from "./components/navigation";
import QueryWrapper from "./components/queryWrapper";
import "./globals.css";

export const metadata = {
	title: "Lead Generation",
	description: "Organize and track your leads",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	getUser();
	return (
		<html lang="en" data-theme="wireframe">
			<body>
				<Navigation />
				<div className="w-full h-full prose max-w-none">
					<SessionProvider>
						<QueryWrapper>{children}</QueryWrapper>
					</SessionProvider>
				</div>
			</body>
		</html>
	);
}
