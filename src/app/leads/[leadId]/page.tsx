import { getLeadDetailsById } from "@/server/leads";
import Link from "next/link";
import NewNote from "./newNote";
import DeleteNote from "./deleteNote";
import { EditModal } from "@/app/components/leadForm";

export default async function LeadPage({
	params,
}: {
	params: { leadId: string };
}) {
	const details = await getLeadDetailsById(params.leadId);

	if (!details) {
		return (
			<div className="p-4">
				<h1>Lead Not Found</h1>
				<Link href="/">Go back to home</Link>
			</div>
		);
	}

	return (
		<div className="flex flex-row items-stretch w-full h-full">
			<div className="flex flex-col w-2/3 p-8 overflow-y-auto lg:w-3/4">
				<div className="relative max-w-lg p-4 mx-auto shadow card bg-base-200 w-fit">
					<EditModal details={details} />
					<h2>{details.name}</h2>
					<p className="text-break">Email: {details.email}</p>
					<p>Phone: {details.phone}</p>
					<p>Company: {details.companyName}</p>
				</div>
			</div>
			<div className="w-1/3 p-4 overflow-y-auto border-l lg:w-1/4 border-base-200">
				<h3>Lead Notes</h3>
				<NewNote leadId={details.id} />
				<hr className="my-5" />
				{details.notes.map((note) => (
					<div key={note.id} className="p-3 mb-3 card bg-base-200">
						<DeleteNote noteId={note.id} leadId={params.leadId} />
						<p>{note.content}</p>
						<p>
							{new Intl.DateTimeFormat("en-US").format(
								note.createdAt
							)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
