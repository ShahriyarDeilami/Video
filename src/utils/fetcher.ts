export const fetcher = async (
  model: string,
  action: string,
  data: any = {}
) => {
  try {
    const res = await fetch("/api/crud", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        action,
        data,
      }),
    });
    const response = await res.json();
    return response;
  } catch (e) {
    console.log(
      `Crud with model : ${model} and action: ${action} with data: ${JSON.stringify(
        data
      )} failed due to err: ${JSON.stringify(e)} `
    );
    return null;
  }
};
