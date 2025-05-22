import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import userContext from "@/context/user.context";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    college: "",
    city: "",
    pincode: "",
    state: "",
    phone: "",
  });

  const {setUserData, setToken,setIsLoggedIn} = useContext(userContext);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const phone = formData.phone.replace(/^0/, "");
    const phoneRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^\d{6}$/;

    if (!formData.firstname.trim() || !formData.lastname.trim()) {
      alert("Please enter both first and last name.");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      alert("Enter a valid 10-digit Indian phone number.");
      return false;
    }
    if (!pincodeRegex.test(formData.pincode)) {
      alert("Enter a valid 6-digit pincode.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newUser = {
      fullname: {
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
      },
      email: formData.email,
      password: formData.password,
      address: formData.address,
      college: formData.college,
      city: formData.city,
      pincode: formData.pincode,
      state: formData.state,
      phone: formData.phone.replace(/^0/, ""),
    };

    try {
      const response = await axios.post("/api/user/register", newUser);

      // console.log("Response:", response);
      if (response.status === 201) {
        const data = response.data;
        console.log("Signup successful:", data);
        setUserData(data.user);
        setToken(data.token);
        localStorage.setItem("token", JSON.stringify(data.token));
        alert("Signup successful!");
        setIsLoggedIn(true);
        navigate("/home");

        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          address: "",
          college: "",
          city: "",
          pincode: "",
          state: "",
          phone: "",
        });
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4 py-10">
      <Card className="w-full max-w-3xl rounded-2xl shadow-xl">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-3xl font-semibold text-center text-blue-600">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="college">College</Label>
                <Input
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit code"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
