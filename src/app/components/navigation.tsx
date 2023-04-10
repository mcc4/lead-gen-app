import { asyncComponent } from "@/utils/asyncfix";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Signout from "./signout";

async function Navigation() {
	const session = await getServerSession();
	return (
		<div className="shadow navbar bg-base-100">
			<div className="flex-1">
				<Link
					href="/"
					className="text-xl no-underline normal-case btn btn-ghost"
				>
					Lead Generation
				</Link>
			</div>
			<div className="flex-none">
				<div className="dropdown dropdown-end">
					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							<img src={session?.user?.image ?? ""} />
						</div>
					</label>
					<ul
						tabIndex={0}
						className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
					>
						<li>
							<Signout />
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default asyncComponent(Navigation);
