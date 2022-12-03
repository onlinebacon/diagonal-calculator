const writeTextField = (name, title) => document.writeln(`
	<div class="field">
		<div class="field-title">${title}</div>
		<div class="field-content"><input type="text" name="${name}"></div>
	</div>
`.replace(/\s*\n\s*/g, ''));

const writeSelectField = (name, title, options) => document.writeln(`
	<div class="field">
		<div class="field-title">${title}</div>
		<div class="field-content">
			<select name="${name}">
				${options.map(({ title, value }) => `
					<option value="${value}">${title}</option>
				`).join('')}
			</select>
		</div>
	</div>
`.replace(/\s*\n\s*/g, ''));
