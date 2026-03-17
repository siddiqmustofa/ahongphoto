import requests
import sys
from datetime import datetime
import json

class GlowBoxAPITester:
    def __init__(self, base_url="https://sweet-snap-box.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            
            result = {
                "test": name,
                "endpoint": endpoint,
                "method": method,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                    print(f"   Response: {json.dumps(result['response_data'], indent=2)[:200]}...")
                except:
                    result["response_data"] = response.text[:200] if response.text else "No response body"
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    result["error"] = response.json()
                    print(f"   Error Response: {result['error']}")
                except:
                    result["error"] = response.text[:200] if response.text else "No error details"

            self.test_results.append(result)
            return success, result.get("response_data", {})

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout after {timeout} seconds")
            self.test_results.append({
                "test": name,
                "endpoint": endpoint,
                "method": method,
                "success": False,
                "error": "Request timeout"
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "test": name,
                "endpoint": endpoint,
                "method": method,
                "success": False,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )

    def test_status_creation(self):
        """Test status check creation"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=test_data
        )

    def test_status_retrieval(self):
        """Test status checks retrieval"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )

    def test_send_photo_email(self):
        """Test photo email sending (mocked)"""
        test_data = {
            "email": "test@example.com",
            "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABg...(sample_base64_data)",
            "frameName": "Test Frame"
        }
        return self.run_test(
            "Send Photo Email",
            "POST",
            "send-photo",
            200,
            data=test_data
        )

    def test_print_photo(self):
        """Test photo printing (mocked)"""
        test_data = {
            "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABg...(sample_base64_data)",
            "frameName": "Test Frame",
            "layout": {"spacing": 20, "photoHeight": 240}
        }
        return self.run_test(
            "Print Photo",
            "POST",
            "print-photo",
            200,
            data=test_data
        )

    def test_get_photos(self):
        """Test getting photo records"""
        return self.run_test(
            "Get Photo Records",
            "GET",
            "photos",
            200
        )

    def test_get_print_jobs(self):
        """Test getting print jobs"""
        return self.run_test(
            "Get Print Jobs",
            "GET",
            "print-jobs",
            200
        )

def main():
    print("🎀 Starting GlowBox Photobooth API Tests 🎀\n")
    
    # Setup
    tester = GlowBoxAPITester()
    
    # Run all tests
    print("=" * 50)
    print("BASIC API TESTS")
    print("=" * 50)
    
    # Test root endpoint
    tester.test_root_endpoint()
    
    # Test status endpoints
    tester.test_status_creation()
    tester.test_status_retrieval()
    
    # Test core photobooth functionality
    print("\n" + "=" * 50)
    print("PHOTOBOOTH FUNCTIONALITY TESTS")
    print("=" * 50)
    
    tester.test_send_photo_email()
    tester.test_print_photo()
    tester.test_get_photos()
    tester.test_get_print_jobs()
    
    # Print final results
    print("\n" + "=" * 50)
    print("TEST SUMMARY")
    print("=" * 50)
    print(f"📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! GlowBox API is working perfectly.")
        return_code = 0
    else:
        print(f"❌ {tester.tests_run - tester.tests_passed} test(s) failed.")
        print("\nFailed tests:")
        for result in tester.test_results:
            if not result["success"]:
                print(f"- {result['test']}: {result.get('error', 'Unknown error')}")
        return_code = 1
    
    # Save detailed results
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    results_file = f"/app/test_reports/backend_test_results_{timestamp}.json"
    
    try:
        with open(results_file, 'w') as f:
            json.dump({
                "timestamp": timestamp,
                "summary": {
                    "total_tests": tester.tests_run,
                    "passed_tests": tester.tests_passed,
                    "failed_tests": tester.tests_run - tester.tests_passed,
                    "success_rate": (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
                },
                "detailed_results": tester.test_results
            }, f, indent=2, default=str)
        print(f"\n📄 Detailed test results saved to: {results_file}")
    except Exception as e:
        print(f"\n⚠️ Could not save test results: {str(e)}")
    
    return return_code

if __name__ == "__main__":
    sys.exit(main())