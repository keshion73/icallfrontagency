<script>
const err = {
    commonErr(res) {
        //console.log("글로벌와ㄸ", res.response.status);
        var statusCode = res.response.status;
        if (statusCode == 404) {
            this.$router.push("/error");
        } else {
            alert(" Error :: " + statusCode);
        }
    }
}
export default
    {
        err
    }
</script>