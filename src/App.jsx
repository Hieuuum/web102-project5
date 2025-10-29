import { useState, useEffect } from "react";
import "./App.css";
import shakespeareWorks from "./data/shakespeare";

function App() {
	const [list, setList] = useState(null);

	useEffect(() => {
		const fetchBookData = async () => {
			const response = await fetch(
				"https://openlibrary.org/search.json?q=author%3A%22William+Shakespeare%22&mode=everything&sort=rating&fields=key,title,author_name,editions,subject,first_publish_year"
			);
			const json = await response.json();
			setList(json);
			console.log(json);
		};
		fetchBookData().catch(console.error);
		console.log(shakespeareWorks);
	}, []);

	return (
		<>
			<h1>William Shakespeare's Works</h1>
			<h2>
				Shakespeare's works include 38 plays, 154 sonnets, two long narrative
				poems, and several other poems
			</h2>

			{list && (
				<div className="table-wrap">
					<table className="works-table">
						<thead>
							<tr>
								<th>Title</th>
								<th>First Published Year</th>
								<th>Number of Editions</th>
							</tr>
						</thead>
						<tbody>
							{list.docs
								.filter((work, i) => i < 14)
								.map((work, i) => {
									const editions =
										work.editions?.numFound ?? work.edition_count ?? "—";
									const year = work.first_publish_year ?? "—";
									const key = work.key ?? `${work.title}-${i}`;
									return (
										<tr key={key}>
											<td className="title-cell" data-label="Title">
												{work.title}
											</td>
											<td
												className="year-cell"
												data-label="First Published Year"
											>
												{year}
											</td>
											<td
												className="editions-cell"
												data-label="Number of Editions"
											>
												{editions}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default App;
